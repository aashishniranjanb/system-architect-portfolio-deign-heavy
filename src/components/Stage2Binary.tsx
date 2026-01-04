'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function BinaryStream({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  
  const particleCount = 2000;
  
  const { positions, colors, speeds } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      // Create a tunnel-like distribution
      const angle = Math.random() * Math.PI * 2;
      const radius = 2 + Math.random() * 8;
      
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
      
      // Alternate between cyan and amber
      const isHighlight = Math.random() > 0.7;
      if (isHighlight) {
        colors[i * 3] = 1; // R
        colors[i * 3 + 1] = 0.69; // G
        colors[i * 3 + 2] = 0; // B (Amber)
      } else {
        colors[i * 3] = 0; // R
        colors[i * 3 + 1] = 0.82; // G
        colors[i * 3 + 2] = 1; // B (Cyan)
      }
      
      speeds[i] = 0.02 + Math.random() * 0.08;
    }
    
    return { positions, colors, speeds };
  }, []);

  useFrame(() => {
    if (!particlesRef.current) return;
    
    const positionAttr = particlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const positions = positionAttr.array as Float32Array;
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3 + 2] -= speeds[i] * (1 + scrollProgress * 2);
      
      if (positions[i * 3 + 2] < -20) {
        positions[i * 3 + 2] = 20;
      }
    }
    
    positionAttr.needsUpdate = true;
    
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

function HexBlocks({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 50;
  const dummy = new THREE.Object3D();

  const hexValues = useMemo(() => {
    return Array.from({ length: count }, () => 
      Math.floor(Math.random() * 255).toString(16).padStart(2, '0').toUpperCase()
    );
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    for (let i = 0; i < count; i++) {
      const t = state.clock.elapsedTime + i * 0.1;
      const lane = (i % 8) - 4;
      
      dummy.position.set(
        lane * 1.5,
        Math.sin(t * 0.5) * 0.5,
        -5 + (i / count) * 20 - ((state.clock.elapsedTime * 2) % 20)
      );
      dummy.scale.set(1, 0.3, 0.1);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#FFB000" transparent opacity={0.3} />
    </instancedMesh>
  );
}

function InstructionLanes({ scrollProgress }: { scrollProgress: number }) {
  const instructions = [
    'MOV R0, #0x1000',
    'LDR R1, [R0]',
    'ADD R2, R1, #0xFF',
    'STR R2, [R0, #4]',
    'CMP R2, #0x00',
    'BNE loop_start',
    'SVC #0',
  ];

  return (
    <group position={[0, 0, 5]}>
      {instructions.map((_, i) => (
        <mesh
          key={i}
          position={[
            ((i % 4) - 1.5) * 2,
            (Math.floor(i / 4) - 0.5) * 1.5,
            -i * 2
          ]}
        >
          <planeGeometry args={[1.8, 0.4]} />
          <meshBasicMaterial 
            color={i % 2 === 0 ? '#00D1FF' : '#FFB000'} 
            transparent 
            opacity={0.1 + scrollProgress * 0.2} 
          />
        </mesh>
      ))}
    </group>
  );
}

interface Stage2Props {
  scrollProgress: number;
}

export default function Stage2Binary({ scrollProgress }: Stage2Props) {
  return (
    <section className="h-[200vh] relative">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* 3D Canvas */}
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
            <fog attach="fog" args={['#0F1216', 5, 30]} />
            <ambientLight intensity={0.3} />
            <BinaryStream scrollProgress={scrollProgress} />
            <HexBlocks scrollProgress={scrollProgress} />
            <InstructionLanes scrollProgress={scrollProgress} />
          </Canvas>
        </div>

        {/* Text Content - Sticky Left */}
        <div className="absolute left-0 top-0 h-full w-full md:w-1/2 lg:w-1/3 flex items-center z-10">
          <div className="p-6 md:p-12 glass rounded-r-lg">
            <div className="mb-6">
              <span className="font-mono text-xs text-[#FFB000] tracking-widest uppercase">
                Layer 2
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 leading-tight">
              Firmware &<br />Instruction Sets
            </h2>
            <p className="text-sm font-mono text-gray-400 leading-relaxed">
              Optimizing logic where constraints are real.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <div className="w-8 h-[2px] bg-[#FFB000]" />
              <span className="text-xs font-mono text-[#FFB000]">
                Binary / ISA / Assembly
              </span>
            </div>

            {/* Assembly example */}
            <div className="mt-8 p-4 bg-[#0F1216] rounded border border-[#1B2633]">
              <pre className="text-xs font-mono text-[#00D1FF] leading-relaxed">
{`; ARM Cortex-M4
loop_start:
  LDR  R0, =0x40020000
  LDR  R1, [R0, #0x14]
  ORR  R1, R1, #0x01
  STR  R1, [R0, #0x14]
  B    loop_start`}
              </pre>
            </div>

            {/* Architectures */}
            <div className="mt-8 flex flex-wrap gap-2">
              {['ARM', 'RISC-V', 'x86', 'MIPS'].map((arch) => (
                <span 
                  key={arch}
                  className="px-3 py-1 text-xs font-mono border border-[#00D1FF] text-[#00D1FF] rounded"
                  style={{ boxShadow: '0 0 10px rgba(0, 209, 255, 0.2)' }}
                >
                  {arch}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Binary rain overlay */}
        <div className="absolute right-0 top-0 w-1/3 h-full overflow-hidden pointer-events-none opacity-20">
          <div className="binary-stream font-mono text-[#00D1FF] text-xs leading-loose">
            {Array.from({ length: 50 }).map((_, i) => (
              <div key={i} className="whitespace-nowrap">
                {Array.from({ length: 40 }).map((_, j) => (
                  <span key={j}>{Math.random() > 0.5 ? '1' : '0'}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
