import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PresentationControls, Environment, ContactShadows } from '@react-three/drei';

const Model = ({ modelPath }) => {
  const modelRef = useRef();

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <mesh ref={modelRef} position={[0, 0, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={modelPath.includes('milk') ? '#f1f5f9' : '#22c55e'} />
    </mesh>
  );
};

const Product3DViewer = ({ modelPath }) => {
  return (
    <div className="h-[300px] w-full">
      <Canvas dpr={[1, 2]} shadows camera={{ position: [0, 0, 4], fov: 50 }}>
        <Suspense fallback={null}>
          <PresentationControls
            global
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
          >
            <Model modelPath={modelPath} />
          </PresentationControls>
          <Environment preset="city" />
          <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={5} blur={2.4} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Product3DViewer;
