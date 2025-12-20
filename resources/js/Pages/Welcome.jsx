// resources/js/Pages/Welcome.jsx
import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import IntroScene from '@/Components/IntroScene';
import LandingUI from '@/Components/LandingUI';
import { motion, AnimatePresence } from 'framer-motion';

export default function Welcome() {
    const [introFinished, setIntroFinished] = useState(false);

    return (
        <>
            <Head title="Welcome to Pokeverse" />

            <div className="bg-black min-h-screen overflow-hidden relative">
                
                {/* INTRO LAYER */}
                <AnimatePresence>
                    {!introFinished && (
                        <motion.div
                            key="intro-layer"
                            className="fixed inset-0 z-50"
                            // THE WARP EXIT ANIMATION:
                            exit={{ 
                                scale: 20,          // Zoom in MASSIVELY
                                opacity: 0,         // Fade out
                                filter: "blur(20px)" // Motion blur effect
                            }}
                            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }} // Exponential curve
                        >
                            <IntroScene onComplete={() => setIntroFinished(true)} />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* LANDING PAGE LAYER */}
                <div className="relative z-10">
                     {/* 
                        Delay showing the UI slightly so it appears 
                        AFTER the warp effect starts clearing up 
                      */}
                     <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: introFinished ? 1 : 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                     >
                        <LandingUI />
                     </motion.div>
                </div>
                
            </div>
        </>
    );
}