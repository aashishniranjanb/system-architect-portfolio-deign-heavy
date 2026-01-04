'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function SiliconWafer({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]} rotation={[0.3, 0, 0]}>
      <circleGeometry args={[8, 64]} />
      <meshBasicMaterial 
        color="#1B2633" 
        transparent 
        opacity={0.5}
      />
    </mesh>
  );
}

function GDSIILayout({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create metal layer patterns
  const metalLayers = useMemo(() => {
    const layers = [];
    const gridSize = 12;
    
    for (let layer = 0; layer < 4; layer++) {
      const traces = [];
      for (let i = 0; i < 20; i++) {
        const isHorizontal = layer % 2 === 0;
        traces.push({
          x: isHorizontal ? 0 : (Math.random() - 0.5) * gridSize,
          y: isHorizontal ? (Math.random() - 0.5) * gridSize : 0,
          z: layer * 0.3,
          width: isHorizontal ? gridSize : 0.1 + Math.random() * 0.2,
          height: isHorizontal ? 0.1 + Math.random() * 0.2 : gridSize,
          color: layer === 0 ? '#00D1FF' : layer === 1 ? '#FFB000' : layer === 2 ? '#FF6B6B' : '#6BCB77'
        });
      }
      layers.push({ layer, traces });
    }
    return layers;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = 0.5 + Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      groupRef.current.position.z = -3 + scrollProgress * 5;
    }
  });

  return (
    <group ref={groupRef}>
      {metalLayers.map(({ layer, traces }) => (
        <group key={layer}>
          {traces.map((trace, i) => (
            <mesh
              key={i}
              position={[trace.x, trace.y, trace.z - 2]}
            >
              <planeGeometry args={[trace.width, trace.height]} />
              <meshBasicMaterial 
                color={trace.color} 
                transparent 
                opacity={0.3 + scrollProgress * 0.3} 
              />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

function Transistor({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const electronRefs = useRef<THREE.Mesh[]>([]);
  
  const gateActive = scrollProgress > 0.5;

  useFrame((state) => {
    if (groupRef.current) {
      const scale = 0.5 + scrollProgress * 1.5;
      groupRef.current.scale.setScalar(scale);
      groupRef.current.position.z = scrollProgress * 3;
    }

    // Animate electrons if gate is active
    if (gateActive) {
      electronRefs.current.forEach((electron, i) => {
        if (electron) {
          const speed = 0.05;
          electron.position.x += speed;
          if (electron.position.x > 1.5) {
            electron.position.x = -1.5;
          }
        }
      });
    }
  });

  return (
    <group ref={groupRef} position={[3, 0, 0]}>
      {/* Gate */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.8, 0.3, 0.3]} />
        <meshBasicMaterial 
          color={gateActive ? '#FFB000' : '#666666'} 
          transparent 
          opacity={0.8}
        />
      </mesh>
      
      {/* Gate oxide */}
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[1, 0.1, 0.4]} />
        <meshBasicMaterial color="#00D1FF" transparent opacity={0.3} />
      </mesh>
      
      {/* Source */}
      <mesh position={[-1, 0, 0]}>
        <boxGeometry args={[0.6, 0.4, 0.4]} />
        <meshBasicMaterial color="#00D1FF" transparent opacity={0.6} />
      </mesh>
      
      {/* Drain */}
      <mesh position={[1, 0, 0]}>
        <boxGeometry args={[0.6, 0.4, 0.4]} />
        <meshBasicMaterial color="#00D1FF" transparent opacity={0.6} />
      </mesh>
      
      {/* Channel */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.4, 0.2, 0.35]} />
        <meshBasicMaterial 
          color={gateActive ? '#00D1FF' : '#1B2633'} 
          transparent 
          opacity={gateActive ? 0.4 : 0.2} 
        />
      </mesh>
      
      {/* Substrate */}
      <mesh position={[0, -0.4, 0]}>
        <boxGeometry args={[3, 0.5, 0.5]} />
        <meshBasicMaterial color="#1B2633" transparent opacity={0.8} />
      </mesh>
      
      {/* Electrons (particles) */}
      {gateActive && Array.from({ length: 8 }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) electronRefs.current[i] = el; }}
          position={[-1.5 + (i * 0.3), 0, 0]}
        >
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#00D1FF" />
        </mesh>
      ))}
      
      {/* Labels */}
      <group position={[0, 1, 0]}>
        <mesh position={[0, 0.2, 0]}>
          <planeGeometry args={[0.6, 0.2]} />
          <meshBasicMaterial color="#FFB000" transparent opacity={0.1} />
        </mesh>
      </group>
    </group>
  );
}

function ElectronFlow({ scrollProgress }: { scrollProgress: number }) {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 500;
  
  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      velocities[i] = 0.01 + Math.random() * 0.03;
    }
    
    return { positions, velocities };
  }, []);

  useFrame(() => {
    if (!particlesRef.current || scrollProgress < 0.3) return;
    
    const positionAttr = particlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const positions = positionAttr.array as Float32Array;
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] += velocities[i] * scrollProgress * 2;
      
      if (positions[i * 3] > 5) {
        positions[i * 3] = -5;
      }
    }
    
    positionAttr.needsUpdate = true;
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
        size={0.03}
        color="#00D1FF"
        transparent
        opacity={0.6 * scrollProgress}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

interface Stage3Props {
  scrollProgress: number;
}

export default function Stage3Silicon({ scrollProgress }: Stage3Props) {
  return (
    <section className="h-[200vh] relative">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* 3D Canvas */}
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
            <fog attach="fog" args={['#0F1216', 5, 25]} />
            <ambientLight intensity={0.4} />
            <pointLight position={[5, 5, 5]} intensity={0.5} color="#00D1FF" />
            <pointLight position={[-5, -5, 5]} intensity={0.3} color="#FFB000" />
            <SiliconWafer scrollProgress={scrollProgress} />
            <GDSIILayout scrollProgress={scrollProgress} />
            <Transistor scrollProgress={scrollProgress} />
            <ElectronFlow scrollProgress={scrollProgress} />
          </Canvas>
        </div>

        {/* Text Content - Sticky Left */}
        <div className="absolute left-0 top-0 h-full w-full md:w-1/2 lg:w-1/3 flex items-center z-10">
          <div className="p-6 md:p-12 glass rounded-r-lg">
            <div className="mb-6">
              <span className="font-mono text-xs text-[#FFB000] tracking-widest uppercase">
                Layer 3
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 leading-tight">
              VLSI &<br />Physics
            </h2>
            <p className="text-sm font-mono text-gray-400 leading-relaxed">
              Designing the hardware that defines performance.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <div className="w-8 h-[2px] bg-[#00D1FF]" />
              <span className="text-xs font-mono text-[#00D1FF]">
                Silicon / Transistors / Electrons
              </span>
            </div>

            {/* Process nodes */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { node: '7nm', type: 'FinFET' },
                { node: '5nm', type: 'GAA' },
                { node: '3nm', type: 'MBCFET' },
                { node: '2nm', type: 'CFET' },
              ].map((item) => (
                <div 
                  key={item.node}
                  className="p-3 bg-[#0F1216] rounded border border-[#1B2633]"
                >
                  <div className="text-lg font-mono text-[#FFB000]">{item.node}</div>
                  <div className="text-xs font-mono text-gray-500">{item.type}</div>
                </div>
              ))}
            </div>

            {/* Transistor state indicator */}
            <div className="mt-8 p-4 bg-[#0F1216] rounded border border-[#1B2633]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-gray-500">Gate Voltage</span>
                <span className="text-xs font-mono text-[#00D1FF]">
                  {scrollProgress > 0.5 ? 'HIGH' : 'LOW'}
                </span>
              </div>
              <div className="h-2 bg-[#1B2633] rounded overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#00D1FF] to-[#FFB000] transition-all duration-300"
                  style={{ width: `${scrollProgress * 100}%` }}
                />
              </div>
              <div className="mt-2 text-xs font-mono text-gray-500">
                Channel: {scrollProgress > 0.5 ? 'Conducting' : 'Depleted'}
              </div>
            </div>
          </div>
        </div>

        {/* Electric field visualization overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 70% 50%, rgba(0, 209, 255, ${0.05 * scrollProgress}) 0%, transparent 50%)`,
          }}
        />
      </div>
    </section>
  );
}
