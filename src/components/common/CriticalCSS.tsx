'use client'

import React from 'react';

const CriticalCSS: React.FC = () => {
    return (
        <style jsx global>{`
      /* Critical CSS for above-the-fold content */
      * {
        box-sizing: border-box;
      }
      
      body {
        margin: 0;
        padding: 0;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        line-height: 1.6;
        color: #1a1a1a;
      }
      
      /* Hero section critical styles */
      .hero-section {
        position: relative;
        min-height: 100vh;
        background-image: url('/banner.png');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        color: white;
        display: flex;
        flex-direction: column;
      }
      
      .hero-section::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.3);
        z-index: 1;
      }
      
      .hero-content {
        position: relative;
        z-index: 2;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 80px 20px 20px;
      }
      
      .hero-title {
        font-size: 2.5rem;
        font-weight: bold;
        margin-bottom: 1rem;
        line-height: 1.1;
      }
      
      .hero-subtitle {
        font-size: 1.8rem;
        font-weight: 600;
        margin-bottom: 2rem;
      }
      
      .hero-cta {
        background-color: #E7C873;
        color: black;
        font-weight: bold;
        padding: 12px 24px;
        border-radius: 12px;
        border: none;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }
      
      .hero-cta:hover {
        background-color: #d4b85a;
      }
      
      /* Search form critical styles */
      .search-form {
        background-color: #1a1a1a;
        border-radius: 12px;
        padding: 24px;
        margin: 20px auto;
        max-width: 1200px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 8px 25px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1);
        position: relative;
        z-index: 2;
        border: 1px solid rgba(255,255,255,0.05);
        backdrop-filter: blur(10px);
      }
      
      .search-form-content {
        display: flex;
        flex-direction: column;
        gap: 24px;
        align-items: stretch;
      }
      
      @media (min-width: 768px) {
        .search-form-content {
          flex-direction: row;
          gap: 0;
          align-items: center;
        }
        
        .hero-title {
          font-size: 4rem;
        }
        
        .hero-content {
          padding: 160px 20px 20px;
        }
      }
      
      /* Loading skeleton */
      .skeleton {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
      }
      
      @keyframes loading {
        0% {
          background-position: 200% 0;
        }
        100% {
          background-position: -200% 0;
        }
      }
      
      /* Prevent layout shift */
      .prevent-shift {
        min-height: 200px;
      }
    `}</style>
    );
};

export default CriticalCSS;
