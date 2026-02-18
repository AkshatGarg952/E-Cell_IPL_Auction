import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'

function Box(props) {
    const meshRef = useRef()
    useFrame((state, delta) => {
        meshRef.current.rotation.x += delta * 0.5
        meshRef.current.rotation.y += delta * 0.2
    })
    return (
        <mesh {...props} ref={meshRef}>
            <icosahedronGeometry args={[1, 1]} />
            <meshStandardMaterial color={'#8b5cf6'} wireframe />
        </mesh>
    )
}

export default function ThreeBackground() {
    return (
        <div className="fixed inset-0 -z-10 bg-black">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-gray-900)_0%,_#000000_100%)] opacity-80"></div>
            {/* Gold Mesh Grid */}
            <div className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: 'linear-gradient(#FFD700 1px, transparent 1px), linear-gradient(90deg, #FFD700 1px, transparent 1px)',
                    backgroundSize: '50px 50px',
                    maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
                }}>
            </div>

            <Canvas>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#FFD700" />
                <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
                {/* Floating Gold Elements can be added here if needed */}
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    )
}
