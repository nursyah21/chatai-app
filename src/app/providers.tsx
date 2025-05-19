'use client'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/queryClient'
import type * as React from 'react'
import { ThemeProvider } from '@/components/theme-provider'

export default function Providers({ children }: { children: React.ReactNode }) {

    return (
        <QueryClientProvider client={queryClient()}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
        </QueryClientProvider>
    )
}