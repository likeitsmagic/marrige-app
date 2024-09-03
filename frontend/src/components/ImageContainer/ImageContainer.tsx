import { FC, PropsWithChildren } from "react";
import bgUrl from 'src/assets/bg.webp'

export const ImageContainer: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="max-w-screen-2xl mx-auto h-[720px] bg-cover bg-center relative" style={{ backgroundImage: `url(${bgUrl})` }}>
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <div className="w-full h-[720px] relative z-10">
                {children}
            </div>
        </div>
    );
}