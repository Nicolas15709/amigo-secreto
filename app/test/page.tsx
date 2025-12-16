'use client';

import { useEffect } from 'react';

export default function Test() {
  useEffect(() => {
    fetch('/api/finish/11', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',  // ← Importante: pide JSON puro
        'Content-Type': 'application/json',
        // Opcional: este header evita RSC en algunos casos
        'Next-Router-State-Tree': '',
      },
    })
      .then(res => res.json())
      .then(data => console.log('Respuesta:', data))
      .catch(err => console.error('Error:', err));
  }, []);

  return <div>Revisa la consola del navegador y del servidor</div>;
}