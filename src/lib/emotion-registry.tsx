'use client'

import { useState } from 'react'

import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'

export default function EmotionRegistry({ children }: { children: React.ReactNode }) {
    const [cache] = useState(() => {
        const cache = createCache({ key: 'css' })
        cache.compat = true
        return cache
    })

    return <CacheProvider value={cache}>{children}</CacheProvider>
}
