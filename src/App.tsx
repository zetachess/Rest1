import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Beef, Beer, CakeSlice, Clock3, CookingPot, CupSoda, Flame, Grid2X2, HandPlatter, Leaf, Mail, MapPin, Martini, Phone, Salad, Sandwich, Search, Sprout, UtensilsCrossed, WheatOff, Wine, type LucideIcon } from 'lucide-react';
import menuData from './data/menu.json';

type Tag = 'vegetariano' | 'vegano' | 'picante' | 'sin gluten';
type MenuItem = {
  id: string;
  category: string;
  name: string;
  description: string;
  price?: number;
  prices?: { label: string; price: number }[];
  image?: string;
  tags: Tag[];
  allergens: string[];
  available: boolean;
};

const categories = ['Todo', 'Para compartir', 'Entrantes', 'Bocadillos', 'Hamburguesas', 'Platos', 'Postres', 'Cervezas', 'Vinos', 'Refrescos', 'Cócteles'];
const euro = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' });
const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
const categoryDetails: Record<string, { icon: LucideIcon; tone: string }> = {
  Todo: { icon: Grid2X2, tone: 'all' },
  'Para compartir': { icon: HandPlatter, tone: 'share' },
  Entrantes: { icon: Salad, tone: 'starters' },
  Bocadillos: { icon: Sandwich, tone: 'sandwiches' },
  Hamburguesas: { icon: Beef, tone: 'burgers' },
  Platos: { icon: CookingPot, tone: 'plates' },
  Postres: { icon: CakeSlice, tone: 'desserts' },
  Cervezas: { icon: Beer, tone: 'beers' },
  Vinos: { icon: Wine, tone: 'wines' },
  Refrescos: { icon: CupSoda, tone: 'soft-drinks' },
  Cócteles: { icon: Martini, tone: 'cocktails' },
};
const tagDetails: Record<Tag, { label: string; icon: typeof Leaf }> = {
  vegetariano: { label: 'Vegetariano', icon: Leaf }, vegano: { label: 'Vegano', icon: Sprout },
  picante: { label: 'Picante', icon: Flame }, 'sin gluten': { label: 'Sin gluten', icon: WheatOff },
};

function Price({ item }: { item: MenuItem }) {
  if (item.price !== undefined) return <strong className="main-price">{euro.format(item.price)}</strong>;
  const prices = item.prices ?? [];
  return <div className="variant-prices">{prices.map((variant) => <span key={variant.label}><small>{variant.label}</small><strong>{euro.format(variant.price)}</strong></span>)}</div>;
}

function MenuCard({ item }: { item: MenuItem }) {
  const CategoryIcon = categoryDetails[item.category]?.icon ?? UtensilsCrossed;
  const categoryTone = categoryDetails[item.category]?.tone ?? 'all';
  return (
    <article className={`menu-card ${!item.image ? 'without-image' : ''} ${!item.available ? 'is-sold-out' : ''}`}>
      {item.image && <div className="card-media">
        <img src={assetUrl(item.image)} alt={`Presentación de ${item.name}`} loading="lazy" width="640" height="480" />
        {!item.available && <span className="sold-badge">Agotado</span>}
      </div>}
      {!item.image && !item.available && <span className="sold-badge sold-badge-inline">Agotado</span>}
      <div className="card-content">
        <div className="card-meta"><span className={`category-label tone-${categoryTone}`}><CategoryIcon aria-hidden="true" />{item.category}</span>{item.price !== undefined && <Price item={item} />}</div>
        <h2>{item.name}</h2>
        <p className="description">{item.description}</p>
        {item.tags.length > 0 && <div className="tag-list" aria-label="Características">{item.tags.map((tag) => { const Icon = tagDetails[tag].icon; return <span key={tag}><Icon aria-hidden="true" />{tagDetails[tag].label}</span>; })}</div>}
        {item.allergens.length > 0 && <p className="allergens"><strong>Alérgenos:</strong> {item.allergens.join(', ')}</p>}
        {item.prices && <Price item={item} />}
      </div>
    </article>
  );
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState('Todo');
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchPanelRef = useRef<HTMLDivElement>(null);
  const items = menuData.items as MenuItem[];
  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault(); searchInputRef.current?.focus(); setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, []);
  const visibleItems = useMemo(() => {
    const term = query.trim().toLocaleLowerCase('es');
    return items.filter((item) => (activeCategory === 'Todo' || item.category === activeCategory) && `${item.name} ${item.description} ${item.category}`.toLocaleLowerCase('es').includes(term));
  }, [activeCategory, items, query]);

  return (
    <>
      <header className="site-header">
        <nav className="nav-shell" aria-label="Navegación principal">
          <a className="brand" href="#home"><img src={assetUrl('/images/logo.webp')} alt="" width="44" height="44" /><span><strong>Bar La Calle</strong><small>Sabor de barrio</small></span></a>
          <div className="nav-links"><a href="#home">Inicio</a><a href="#menu">Carta</a><a href="#contacto">Contacto</a></div>
          <a className="nav-cta" href="tel:+34680790558">Reservar</a>
        </nav>
      </header>

      <main>
      <section className="home" id="home" aria-labelledby="home-title">
        <div className="home-backdrop" aria-hidden="true" />
        <div className="home-grid">
          <div className="home-copy">
            <p className="eyebrow">Cocina cercana · Momentos de siempre</p>
            <h1 id="home-title">El sabor de La Calle, servido en tu mesa</h1>
            <p>Pinchos, raciones, hamburguesas y cocina casera en un ambiente cercano, en pleno Móstoles.</p>
            <div className="home-actions"><a className="primary-action" href="tel:+34680790558"><Phone aria-hidden="true" />Reservar mesa</a><a className="secondary-action" href="#menu"><UtensilsCrossed aria-hidden="true" />Ver la carta</a></div>
            <div className="home-stats"><span><strong>46</strong><small>Propuestas</small></span><span><strong>10</strong><small>Categorías</small></span><span><strong>6 días</strong><small>A la semana</small></span></div>
          </div>
          <div className="home-feature">
            <img src={assetUrl('/images/portada.webp')} alt="Ambiente y gastronomía de Bar La Calle" width="800" height="900" fetchPriority="high" />
            <div className="feature-card"><span>Recomendación de la casa</span><h2>Hamburguesa Richard</h2><p>Doble carne, huevo, bacon, salsa amarilla y queso.</p><a href="#menu" aria-label="Ver la Hamburguesa Richard en la carta"><ArrowRight /></a></div>
          </div>
        </div>

        <div className="contact-strip" id="contacto">
          <a href="https://maps.google.com/?q=Calle+Simón+Hernández+51+Móstoles" target="_blank" rel="noreferrer"><MapPin aria-hidden="true" /><span><small>Dónde estamos</small><strong>C/ Simón Hernández, 51</strong><em>C.C. Villa Fontana · Móstoles</em></span></a>
          <a href="tel:+34680790558"><Phone aria-hidden="true" /><span><small>Reservas</small><strong>680 790 558</strong><em>Llámanos o escríbenos</em></span></a>
          <a href="mailto:reservas@barlacalle.es"><Mail aria-hidden="true" /><span><small>Correo</small><strong>reservas@barlacalle.es</strong><em>Consultas y grupos</em></span></a>
          <div><Clock3 aria-hidden="true" /><span><small>Horario</small><strong>Mar–Dom · 08:00–00:00</strong><em>Lunes cerrado</em></span></div>
        </div>
      </section>

      <section className="menu-hero" id="menu" aria-labelledby="menu-title">
        <div className="brand-mark" aria-hidden="true"><UtensilsCrossed /></div>
        <p className="eyebrow">Bar La Calle · Móstoles</p>
        <h2 id="menu-title">Nuestra carta</h2>
        <p className="lead">Sabores de siempre, raciones para compartir y una buena mesa esperándote.</p>
      </section>

      <section className="menu-tools" aria-label="Buscar y filtrar la carta">
        <div className="search-panel" ref={searchPanelRef} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setSearchOpen(false); }}>
          <label className="search"><Search aria-hidden="true" /><span className="sr-only">Buscar en la carta</span><input ref={searchInputRef} type="search" value={query} onFocus={() => setSearchOpen(true)} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar plato o bebida…" /><span className="shortcut"><kbd>⌘</kbd><kbd>K</kbd></span></label>
          {searchOpen && <div className="search-suggestions"><div className="suggestion-title"><span>Explorar categorías</span><small>{activeCategory}</small></div><div className="suggestion-list">{categories.filter((category) => category.toLocaleLowerCase('es').includes(query.toLocaleLowerCase('es')) || query === '').map((category) => { const detail = categoryDetails[category]; const CategoryIcon = detail.icon; return <button type="button" key={category} onMouseDown={(event) => event.preventDefault()} onClick={() => { setActiveCategory(category); setQuery(''); setSearchOpen(false); document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' }); }}><span className={`suggestion-icon tone-${detail.tone}`}><CategoryIcon aria-hidden="true" /></span><span><strong>{category}</strong><small>{category === 'Todo' ? `${items.length} productos` : `${items.filter((item) => item.category === category).length} productos`}</small></span><ArrowRight /></button>; })}</div></div>}
        </div>
        <div className="category-list" role="group" aria-label="Categorías">
          {categories.map((category) => { const detail = categoryDetails[category]; const CategoryIcon = detail.icon; return <button className={`${activeCategory === category ? 'active' : ''} tone-${detail.tone}`} aria-pressed={activeCategory === category} key={category} onClick={() => setActiveCategory(category)}><CategoryIcon aria-hidden="true" />{category}</button>; })}
        </div>
      </section>

      <section className="results" aria-live="polite">
        <div className="results-heading"><p><strong>{visibleItems.length}</strong> productos</p>{activeCategory !== 'Todo' && <h2>{activeCategory}</h2>}</div>
        {visibleItems.length > 0 ? <div className="menu-grid">{visibleItems.map((item) => <MenuCard item={item} key={item.id} />)}</div> : <div className="empty"><UtensilsCrossed /><h2>No encontramos resultados</h2><p>Prueba con otra búsqueda o cambia de categoría.</p><button onClick={() => { setQuery(''); setActiveCategory('Todo'); }}>Ver toda la carta</button></div>}
      </section>

      <footer><img src={assetUrl('/images/logo.webp')} alt="Bar La Calle" width="68" height="68" /><p>Los precios incluyen IVA · Consulta al personal sobre alergias e intolerancias.</p></footer>
      </main>
    </>
  );
}
