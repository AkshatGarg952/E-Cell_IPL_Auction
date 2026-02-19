import React from 'react'

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
        </div>
    )
}
