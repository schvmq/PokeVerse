// resources/js/Components/IntroScene.jsx
import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Stars, Sparkles } from '@react-three/drei';
import Pokeball from './3D/Pokeball';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Intro Fly-in Physics
function ThrowAnimation({ children, isLanded }) {
    const group = useRef();
    useFrame((state) => {
        if (!group.current) return;
        group.current.position.lerp(new THREE.Vector3(0, 0, 0), 0.08);
        
        // Spin while flying, stop when close
        if (group.current.position.z > 0.5) {
             group.current.rotation.x += 0.10;
        } else {
             group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, 0, 0.1);
        }
    });
    // Start far behind camera
    return <group ref={group} position={[0, -5, 15]}>{children}</group>;
}

export default function IntroScene({ onComplete }) {
  const [isInteracting, setIsInteracting] = useState(false);

  const handleActivation = () => {
    if (isInteracting) return;
    
    setIsInteracting(true);
    
    // Wait for the shake animation (1.2s) then trigger parent exit
    setTimeout(() => {
        onComplete();
    }, 1200);
  };

  return (
    <div className="relative w-full h-screen bg-transparent">
      
      {/* 3D CANVAS */}
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.6} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Sparkles count={40} scale={6} size={2} speed={0.4} opacity={0.5} color="#fff" />
        <Environment preset="city" />

        <ThrowAnimation>
            <Pokeball 
                onInteraction={handleActivation} 
                isInteracting={isInteracting} 
            />
        </ThrowAnimation>
      </Canvas>

      {/* HTML OVERLAY */}
      {/* Positioned absolutely over the canvas */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-24 pointer-events-none">
        <motion.button
            onClick={handleActivation}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInteracting ? 0 : 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="pointer-events-auto group relative px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-mono tracking-widest text-sm uppercase hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        >
            <span className="relative z-10 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                Enter World
            </span>
            {/* Hover Glow */}
            <div className="absolute inset-0 rounded-full bg-white/5 blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </motion.button>
      </div>

    </div>
  );
}