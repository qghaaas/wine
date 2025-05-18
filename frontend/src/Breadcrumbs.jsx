import { Link, useLocation } from 'react-router-dom';

const pathNamesMap = {
    basket: "Корзина",
    catalog: "Каталог",
    profile: "Профиль",
    // Добавьте другие пути по необходимости
};

export default function Breadcrumbs() {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(Boolean);

    return (
        <div className="breadcrumbs">
            <Link to="/">Главная</Link>
            {pathnames.map((name, index) => {
                const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                const isLast = index === pathnames.length - 1;
                const displayName = pathNamesMap[name] || name;
                
                return isLast ? (
                    <span key={name}>
                        <span> / </span>
                        <span>{displayName}</span>
                    </span>
                ) : (
                    <span key={name}>
                        <span> / </span>
                        <Link to={routeTo}>{displayName}</Link>
                    </span>
                );
            })}
        </div>
    );
}