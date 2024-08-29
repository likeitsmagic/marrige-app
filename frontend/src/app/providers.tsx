'use client'

import { NextUIProvider } from '@nextui-org/react'
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl'
import { PropsWithChildren } from 'react'

interface ProvidersProps extends PropsWithChildren {
    messages: AbstractIntlMessages
    locale: string
    timeZone: string
}

export const Providers = ({ children, messages, locale, timeZone }: ProvidersProps) => {
    return (
        <NextIntlClientProvider messages={messages} locale={locale} timeZone={timeZone}>
            <NextUIProvider>
                {children}
            </NextUIProvider>
        </NextIntlClientProvider>
    )
}