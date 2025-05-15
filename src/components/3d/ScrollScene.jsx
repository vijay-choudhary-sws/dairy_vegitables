import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useScroll } from 'framer-motion';
import PropTypes from 'prop-types';

function Scene({ scrollProgress }) {
  const meshRef = useRef();
  const { viewport } = useThree();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = scrollProgress * Math.PI * 2;
      meshRef.current.position.y = Math.sin(scrollProgress * Math.PI) * 2;
      meshRef.current.scale.x = 1 + scrollProgress * 0.5;
      meshRef.current.scale.y = 1 + scrollProgress * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <torusKnotGeometry args={[1, 0.3, 128, 16]} />
      <meshStandardMaterial color="#22c55e" metalness={0.5} roughness={0.3} />
    </mesh>
  );
}

Scene.propTypes = {
  scrollProgress: PropTypes.number.isRequired
};

function ScrollScene() {
  const containerRef = useRef();
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = React.useState(0);

  useEffect(() => {
    return scrollYProgress.onChange(latest => {
      setProgress(latest);
    });
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="h-screen w-full fixed top-0 left-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Scene scrollProgress={progress} />
      </Canvas>
    </div>
  );
}

export default ScrollScene;