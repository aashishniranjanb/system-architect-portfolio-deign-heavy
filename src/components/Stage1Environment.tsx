'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

function PixelGrid({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 1000;
  const dummy = new THREE.Object3D();

  useEffect(() => {
    if (!meshRef.current) return;
    
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 15;
      const z = (Math.random() - 0.5) * 10;
      
      dummy.position.set(x, y, z);
      dummy.scale.setScalar(0.05 + Math.random() * 0.05);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    
    for (let i = 0; i < count; i++) {
      meshRef.current.getMatrixAt(i, dummy.matrix);
      dummy.matrix.decompose(dummy.position, dummy.quaternion, dummy.scale);
      
      // Separate RGB as we scroll
      const separation = scrollProgress * 0.5;
      const colorOffset = (i % 3) - 1;
      dummy.position.x += colorOffset * separation * 0.01;
      
      dummy.position.z -= 0.02;
      if (dummy.position.z < -5) {
        dummy.position.z = 5;
      }
      
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 0.1]} />
      <meshBasicMaterial color="#00D1FF" transparent opacity={0.6} />
    </instancedMesh>
  );
}

function KernelLogs({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  
  const logs = [
    '[ OK ] Started System Logger',
    '[ OK ] Reached target Local File Systems',
    '[ OK ] Started Login Service',
    '[ OK ] Loading Kernel Modules...',
    '[ OK ] Network Configuration',
    '[ OK ] GPU Driver Initialized',
    '[ OK ] Audio Subsystem Ready',
    '[ OK ] USB Controller Active',
  ];

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      groupRef.current.rotation.x = scrollProgress * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -2]}>
      {logs.map((log, i) => (
        <Text
          key={i}
          position={[0, 2 - i * 0.4, 0]}
          fontSize={0.15}
          color={log.includes('OK') ? '#00D1FF' : '#FFB000'}
          anchorX="center"
          anchorY="middle"
          font="/fonts/JetBrainsMono-Regular.ttf"
          characters="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789[]/ "
        >
          {log}
        </Text>
      ))}
    </group>
  );
}

function RGBSeparation({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z = scrollProgress * 0.5;
    }
  });

  const separation = scrollProgress * 0.2;

  return (
    <group>
      {/* Red channel */}
      <mesh position={[-separation, 0, -3]}>
        <planeGeometry args={[8, 6]} />
        <meshBasicMaterial color="#ff0000" transparent opacity={0.1} />
      </mesh>
      {/* Green channel */}
      <mesh position={[0, separation, -3.1]}>
        <planeGeometry args={[8, 6]} />
        <meshBasicMaterial color="#00ff00" transparent opacity={0.1} />
      </mesh>
      {/* Blue channel */}
      <mesh position={[separation, 0, -3.2]}>
        <planeGeometry args={[8, 6]} />
        <meshBasicMaterial color="#0000ff" transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

interface Stage1Props {
  scrollProgress: number;
}

export default function Stage1Environment({ scrollProgress }: Stage1Props) {
  return (
    <section className="h-[200vh] relative">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* 3D Canvas */}
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
            <ambientLight intensity={0.5} />
            <RGBSeparation scrollProgress={scrollProgress} />
            <PixelGrid scrollProgress={scrollProgress} />
          </Canvas>
        </div>

        {/* Text Content - Sticky Left */}
        <div className="absolute left-0 top-0 h-full w-full md:w-1/2 lg:w-1/3 flex items-center z-10">
          <div className="p-6 md:p-12 bg-[#0F1216]/80 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none">
            <div className="mb-6">
              <span className="font-mono text-xs text-[#FFB000] tracking-widest uppercase">
                Layer 1
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 leading-tight">
              Interface &<br />Environment
            </h2>
            <p className="text-sm font-mono text-gray-400 leading-relaxed">
              Understanding the system before writing code.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <div className="w-8 h-[2px] bg-[#00D1FF]" />
              <span className="text-xs font-mono text-[#00D1FF]">
                OS / Kernel / Drivers
              </span>
            </div>

            {/* Visual indicators */}
            <div className="mt-12 space-y-3">
              {['Memory Management', 'Process Scheduling', 'I/O Operations'].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div 
                    className="w-1 h-1 rounded-full bg-[#00D1FF]"
                    style={{ 
                      opacity: 0.5 + scrollProgress * 0.5,
                      boxShadow: `0 0 ${8 + scrollProgress * 12}px rgba(0, 209, 255, 0.5)` 
                    }}
                  />
                  <span className="text-xs font-mono text-gray-500">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scanline effect */}
        <div 
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 209, 255, 0.03) 2px, rgba(0, 209, 255, 0.03) 4px)',
          }}
        />

        {/* Glass distortion overlay */}
        <div 
          className="absolute inset-0 pointer-events-none z-15"
          style={{
            opacity: scrollProgress * 0.3,
            background: `
              radial-gradient(ellipse at ${50 + scrollProgress * 20}% ${50 - scrollProgress * 10}%, 
                rgba(0, 209, 255, 0.1) 0%, 
                transparent 50%
              )
            `,
          }}
        />
      </div>
    </section>
  );
}
