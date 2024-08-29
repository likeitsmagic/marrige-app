import { useTranslations } from 'next-intl';
import React from 'react';
import bg from '../../../public/bg.webp';

export const Searcher = () => {

    const t = useTranslations("Header");
    return (
        <div className="max-w-screen-2xl mx-auto h-[720px] bg-cover bg-center flex flex-col justify-end items-center relative" style={{ backgroundImage: `url(${bg.src})` }}>
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <div className="w-full max-w-screen-md mb-32 text-center relative z-10">
                <h1 className="text-white text-4xl mb-8">{t("platform_tagline")}</h1>
                <div className="flex">
                    <input
                        id="name"
                        type="text"
                        placeholder={t("search_placeholder")}
                        className="w-2/3 p-3 border-r-1 border-gray-300 rounded-l-md outline-none bg-white bg-opacity-90"
                    />
                    <input
                        id="location"
                        type="text"
                        placeholder={t("search_location_placeholder")}
                        className="w-1/3 p-3 outline-none bg-white bg-opacity-90"
                    />
                    <button className="bg-primary text-white rounded-r-md px-5 py-3 bg-opacity-90 hover:bg-opacity-100">{t("search_button")}</button>
                </div>
            </div>
        </div>
    );
}