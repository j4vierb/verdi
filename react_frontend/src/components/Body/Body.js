import React from "react";
import HeroSection from "./HeroSection/HeroSection";
import AgricultoresSection from "./AgricultoresSection/AgricultoresSection";
import VentaCompraSection from "./VentaCompraSection/VentaCompraSection";
const Body = () => {
    return (
        <div>
            <HeroSection />
            <AgricultoresSection />
            <VentaCompraSection />
        </div>
    );
};

export default Body;
