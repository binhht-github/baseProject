import MyEditor from "@/components/tiptap/Editor";
import Tiptap from "@/components/tiptap/Tiptap";
import { useTranslation } from "react-i18next"

const HomePage = () => {
    const { t } = useTranslation();
    return (
        <div>
            {t("xin chào mọi người")}
            <MyEditor />
        </div>
    )
}
export default HomePage