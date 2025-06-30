// // src/Tiptap.tsx
// import { EditorProvider, FloatingMenu, BubbleMenu } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'

// // define your extension array
// const extensions = [StarterKit]

// const content = '<p>Hello World!</p>'

// const Tiptap = () => {
//     return (
//         <EditorProvider extensions={extensions} content={content}>
//             <FloatingMenu editor={null}>This is the floating menu</FloatingMenu>
//             <BubbleMenu editor={null}>This is the bubble menu</BubbleMenu>
//         </EditorProvider>
//     )
// }

// export default Tiptap


// src/Tiptap.tsx
import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

// define your extension array
const extensions = [StarterKit]

const content = '<p>Hello World!</p>'

const Tiptap = () => {
    const editor = useEditor({
        extensions,
        content,
    })

    return (
        <>
            <EditorContent editor={editor} />
            <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
            <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
        </>
    )
}

export default Tiptap
