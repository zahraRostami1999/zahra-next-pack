import { useRef, useEffect } from 'react';
import Editor from '@/components/editor/Editor';
import Link from 'next/link';

function IndexPage() {
    const editorRef = useRef();

    useEffect(() => {
        if (editorRef.current) {
            console.log("Editor methods: ", editorRef.current.getValue());
        }
    }, []);

    return (
        <div>
            <div className="flex flex-col w-full justify-center bg-gray-100 px-10 py-5">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold mb-4">Editor Demo</h1>
                    <Link href="/" className="text-xl font-bold mb-4">
                        Back
                    </Link>
                </div>
                <Editor ref={editorRef} />
            </div>
        </div>
    );
}

export default IndexPage;
