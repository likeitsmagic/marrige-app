import { FC, PropsWithChildren } from "react";
import bg from '../../../public/bg.webp';
export const ImageContainer: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="max-w-screen-2xl mx-auto h-[720px] bg-cover bg-center relative" style={{ backgroundImage: `url(${bg.src})` }}>
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <div className="w-full h-[720px] relative z-10">
                {children}
            </div>
        </div>
    );
}