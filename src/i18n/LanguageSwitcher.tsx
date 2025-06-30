import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('i18nextLng', lng);
    };

    const currentLang = i18n.language;

    return (
        <select
            value={currentLang}
            onChange={(e) => changeLanguage(e.target.value)}
            className="border px-2 py-1 rounded bg-background text-foreground"
        >
            <option value="en">🇺🇸 English</option>
            <option value="vi">🇻🇳 Tiếng Việt</option>
            <option value="jp">🇯🇵 日本語</option>
        </select>
    );
};

export default LanguageSwitcher;
