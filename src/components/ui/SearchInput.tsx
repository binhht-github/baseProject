import React, { useEffect, useRef, useState } from 'react';
import { Input } from './input';
import { cn } from '@/lib/utils';
import { useSearchParams } from 'react-router-dom';

interface Props {
    value?: string;
    onChange: (value: string) => void;
    deBounce?: number
    className?: string;
}

function SearchInput({ onChange, value, deBounce, className }: Props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [text, setText] = useState<string>(value ?? searchParams.get("search") ?? "");
    const inputRef = useRef<HTMLInputElement>(null);
    const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (searchParams.get("search")) {
            inputRef.current?.focus();
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setText(newValue);
        const newParams = new URLSearchParams(searchParams);
        if (newValue) {
            newParams.set("search", newValue);
        } else {
            newParams.delete("search");
        }
        setSearchParams(newParams);
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        debounceTimeoutRef.current = setTimeout(() => {
            onChange(newValue);
        }, deBounce ?? 0);
    };

    return <Input ref={inputRef} value={text} onChange={handleChange} className={cn('w-full', className)} />;
}

export default React.memo(SearchInput);
