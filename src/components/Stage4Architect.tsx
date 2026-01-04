'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function BlueprintGrid({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = -0.3;
      groupRef.current.position.z = -5 + scrollProgress * 2;
    }
  });

  const lines = useMemo(() => {
    const lineArray = [];
    const gridSize = 20;
    const divisions = 20;
    const step = gridSize / divisions;

    for (let i = -gridSize / 2; i <= gridSize / 2; i += step) {
      // Horizontal lines
      lineArray.push({ start: [-gridSize / 2, i, 0], end: [gridSize / 2, i, 0] });
      // Vertical lines
      lineArray.push({ start: [i, -gridSize / 2, 0], end: [i, gridSize / 2, 0] });
    }
    return lineArray;
  }, []);

  return (
    <group ref={groupRef}>
      {lines.map((line, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array([...line.start, ...line.end]), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#00D1FF" transparent opacity={0.1} />
        </line>
      ))}
    </group>
  );
}

function ChipVisualization({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      meshRef.current.position.z = -8 + scrollProgress * 6;
      const scale = 0.5 + scrollProgress * 0.5;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={meshRef} position={[4, 0, -5]}>
      {/* Die */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3, 3, 0.3]} />
        <meshBasicMaterial color="#1B2633" transparent opacity={0.9} />
      </mesh>
      
      {/* Die surface pattern */}
      <mesh position={[0, 0, 0.16]}>
        <planeGeometry args={[2.8, 2.8]} />
        <meshBasicMaterial color="#00D1FF" transparent opacity={0.1} />
      </mesh>
      
      {/* Core blocks */}
      {[
        { pos: [-0.8, 0.8, 0.2], size: [0.9, 0.9, 0.1] },
        { pos: [0.8, 0.8, 0.2], size: [0.9, 0.9, 0.1] },
        { pos: [-0.8, -0.8, 0.2], size: [0.9, 0.9, 0.1] },
        { pos: [0.8, -0.8, 0.2], size: [0.9, 0.9, 0.1] },
        { pos: [0, 0, 0.2], size: [0.6, 0.6, 0.15] },
      ].map((block, i) => (
        <mesh key={i} position={block.pos as [number, number, number]}>
          <boxGeometry args={block.size as [number, number, number]} />
          <meshBasicMaterial 
            color={i === 4 ? '#FFB000' : '#00D1FF'} 
            transparent 
            opacity={0.4} 
          />
        </mesh>
      ))}
      
      {/* Package pins */}
      {Array.from({ length: 32 }).map((_, i) => {
        const side = Math.floor(i / 8);
        const pos = (i % 8) - 3.5;
        const offset = 1.8;
        let x = 0, y = 0;
        
        switch (side) {
          case 0: x = pos * 0.4; y = offset; break;
          case 1: x = offset; y = pos * 0.4; break;
          case 2: x = pos * 0.4; y = -offset; break;
          case 3: x = -offset; y = pos * 0.4; break;
        }
        
        return (
          <mesh key={i} position={[x, y, -0.2]}>
            <boxGeometry args={[0.15, 0.15, 0.3]} />
            <meshBasicMaterial color="#FFB000" transparent opacity={0.6} />
          </mesh>
        );
      })}
    </group>
  );
}

function AmbientParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 200;
  
  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#FFB000"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

interface Stage4Props {
  scrollProgress: number;
}

export default function Stage4Architect({ scrollProgress }: Stage4Props) {
  return (
    <section className="h-[150vh] relative">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* 3D Canvas */}
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
            <fog attach="fog" args={['#0F1216', 8, 30]} />
            <ambientLight intensity={0.3} />
            <pointLight position={[5, 5, 5]} intensity={0.5} color="#FFB000" />
            <BlueprintGrid scrollProgress={scrollProgress} />
            <ChipVisualization scrollProgress={scrollProgress} />
            <AmbientParticles />
          </Canvas>
        </div>

        {/* Central content */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center max-w-2xl px-8">
            <div 
              className="w-4 h-4 mx-auto mb-8 rounded-full bg-[#FFB000]"
              style={{ 
                boxShadow: '0 0 30px rgba(255, 176, 0, 0.5), 0 0 60px rgba(255, 176, 0, 0.3)',
                opacity: 0.5 + scrollProgress * 0.5 
              }}
            />
            
            <h2 
              className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 leading-tight"
              style={{ opacity: 0.5 + scrollProgress * 0.5 }}
            >
              I design systems by<br />
              <span className="font-semibold text-gradient">understanding every layer.</span>
            </h2>
            
            <p 
              className="text-lg font-mono text-gray-400 mb-8"
              style={{ opacity: scrollProgress }}
            >
              From silicon to software, from electrons to experiences.
            </p>

            <div 
              className="flex flex-wrap justify-center gap-4 md:gap-6 mt-12"
              style={{ opacity: scrollProgress }}
            >
              {['UI/UX', 'OS', 'Firmware', 'RTL', 'Silicon'].map((layer, i) => (
                <div key={layer} className="text-center">
                  <div 
                    className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-2 rounded border border-[#00D1FF] flex items-center justify-center"
                    style={{
                      background: `rgba(0, 209, 255, ${0.1 + (i * 0.05)})`,
                      boxShadow: `0 0 ${10 + i * 5}px rgba(0, 209, 255, 0.2)`,
                    }}
                  >
                    <span className="text-xs font-mono text-[#00D1FF]">L{i}</span>
                  </div>
                  <span className="text-xs font-mono text-gray-500">{layer}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
              Continue
            </span>
            <div className="w-[1px] h-8 bg-gradient-to-b from-[#FFB000] to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
