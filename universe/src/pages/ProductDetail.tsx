import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { productosService } from "../services/ecommerce/productos.services";
import type { Producto } from "../services/ecommerce/productos.services";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        if (!id) return;

        const data = await productosService.obtenerProductoPorId(Number(id));
        setProduct(data);
      } catch (error) {
        console.error("Error al obtener producto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <h2 style={{ padding: 20 }}>Cargando detalle...</h2>;

  if (!product) return <h2 style={{ padding: 20 }}>Producto no encontrado</h2>;

  return (
    <div style={{ padding: 20 }}>
      <h1>{product.nombre}</h1>

      <img
        src={product.imagen}
        width={300}
        style={{ borderRadius: 10 }}
        alt={product.nombre}
      />

      <p style={{ marginTop: 20 }}>{product.descripcion}</p>

      <p>
        <b>Precio:</b> ${product.precio}
      </p>

      <p>
        <b>Stock:</b> {product.stock}
      </p>

      <p>
        <b>Categoría:</b> {product.categoria}
      </p>
    </div>
  );
}
