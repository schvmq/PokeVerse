// resources/js/Components/3D/Pokeball.jsx
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Pokeball({ onInteraction, isInteracting }) {
  const group = useRef();
  const buttonRef = useRef();
  const lightRef = useRef();

  // Define materials
  const materials = useMemo(() => ({
    red: new THREE.MeshStandardMaterial({ color: "#E30022", roughness: 0.4, metalness: 0.1 }),
    white: new THREE.MeshStandardMaterial({ color: "#FFFFFF", roughness: 0.4, metalness: 0.1 }),
    black: new THREE.MeshStandardMaterial({ color: "#2a2a2a", roughness: 0.6 }),
    buttonIdle: new THREE.MeshStandardMaterial({ color: "#dfdfdf", roughness: 0.2 }),
    // Glowing Red Button for "Capture" state
    buttonActive: new THREE.MeshStandardMaterial({ 
        color: "#ff0000", 
        emissive: "#ff0000",
        emissiveIntensity: 3,
        toneMapped: false 
    })
  }), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (group.current) {
        if (!isInteracting) {
            // IDLE: Gentle Rotation
            group.current.rotation.y = Math.sin(t / 2) * 0.3; 
            group.current.rotation.z = Math.cos(t / 3) * 0.1; 
            group.current.position.y = Math.sin(t) * 0.1;
        } else {
            // INTERACTING: Rapid Shake "Capture" Animation
            // Fast sine wave for wobbling effect
            group.current.rotation.z = Math.sin(t * 30) * 0.3; 
            group.current.rotation.x = Math.cos(t * 25) * 0.1;
            
            // Pulse the red light intensity
            if (lightRef.current) {
                lightRef.current.intensity = 2 + Math.sin(t * 20) * 1;
            }
        }
    }

    // Toggle Button Material
    if (buttonRef.current) {
        buttonRef.current.material = isInteracting ? materials.buttonActive : materials.buttonIdle;
    }
  });

  return (
    <group ref={group} onClick={onInteraction} dispose={null} scale={[0.8, 0.8, 0.8]}>
      
      {/* Red Light emitted from button when shaking */}
      <pointLight ref={lightRef} position={[0, 0, 1.5]} distance={2} intensity={0} color="#ff0000" />

      {/* 1. INNER CORE (Black Band) */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.98, 64, 64]} />
        <primitive object={materials.black} attach="material" />
      </mesh>

      {/* 2. TOP SHELL (Red) */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 64, 64, 0, Math.PI * 2, 0, 1.40]} /> 
        <primitive object={materials.red} attach="material" />
      </mesh>

      {/* 3. BOTTOM SHELL (White) */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI, 0, 0]}>
        <sphereGeometry args={[1, 64, 64, 0, Math.PI * 2, 0, 1.40]} />
        <primitive object={materials.white} attach="material" />
      </mesh>

      {/* --- BUTTON CLUSTER --- */}
      <group position={[0, 0, 0.96]} rotation={[Math.PI / 2, 0, 0]}>
        
        {/* 4. BLACK OUTLINE CIRCLE */}
        <mesh position={[0, -0.05, 0]}>
          <cylinderGeometry args={[0.32, 0.32, 0.2, 64]} />
          <primitive object={materials.black} attach="material" />
        </mesh>

        {/* 5. WHITE HOUSING */}
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.20, 0.20, 0.1, 64]} />
          <primitive object={materials.white} attach="material" />
        </mesh>

        {/* 6. THE BUTTON (Ref attached for material swap) */}
        <mesh ref={buttonRef} position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.1, 64]} />
          <primitive object={materials.buttonIdle} attach="material" />
        </mesh>
        
        {/* 7. Fine Detail Ring */}
         <mesh position={[0, 0.081, 0]}>
          <torusGeometry args={[0.12, 0.005, 16, 64]} />
          <meshBasicMaterial color="#bbb" />
        </mesh>

      </group>
    </group>
  );
}