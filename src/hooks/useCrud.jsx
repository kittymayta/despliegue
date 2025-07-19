import { useState } from 'react';
import axios from 'axios';
import { useConfirm } from "@/components/custom/alert";
import { LuAlertOctagon } from "react-icons/lu";

const useCRUD = () => {
  const confirm = useConfirm();

  const api = axios.create({
    baseURL: 'https://gestiondeauditorias-1.onrender.com/api/',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRequest = async (request, endpoint, data = null) => {
    setLoading(true);
    setError(null);

    try {
      let response;
      if (request === 'get') {
        response = await api.get(endpoint);
      } else if (request === 'post') {
        response = await api.post(endpoint, data);
      } else if (request === 'put') {
        response = await api.put(endpoint, data);
      } else if (request === 'delete') {
        response = await api.delete(endpoint);
      }
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  const get = (endpoint) => handleRequest("get", endpoint);

  const post = async (endpoint, data) => {
    const userConfirmed = await confirm({
      title: "Confirmación requerida",
      body: "¿Estás seguro de que deseas crear o alterar este registro?",
      cancelButton: "Cancelar",
      actionButton: "Crear",
      icon: <LuAlertOctagon className="text-yellow-500 h-60 w-60 mx-auto mb-4" />,
    });
    if (!userConfirmed) {
      throw new Error("Operación cancelada por el usuario");
    }
    return handleRequest("post", endpoint, data);
  };

  const put = async (endpoint, data) => {
    const userConfirmed = await confirm({
      title: "Confirmación requerida",
      body: "¿Estás seguro de que deseas actualizar este registro?",
      cancelButton: "Cancelar",
      actionButton: "Actualizar",
      icon: <LuAlertOctagon className="text-blue-500 h-60 w-60 mx-auto mb-4" />,
    });
    if (!userConfirmed) {
      throw new Error("Operación cancelada por el usuario");
    }
    return handleRequest("put", endpoint, data);
  };

  const eliminar = async (endpoint) => {
    const userConfirmed = await confirm({
      title: "Confirmación requerida",
      body: "¿Estás seguro de que deseas eliminar este registro? Esta acción no se puede deshacer.",
      cancelButton: "Cancelar",
      actionButton: "Eliminar",
      icon: <LuAlertOctagon className="text-red-500 h-60 w-60 mx-auto mb-4" />,
    });
    if (!userConfirmed) {
      throw new Error("Operación cancelada por el usuario");
    }
    return handleRequest("delete", endpoint);
  };

  const desactivar = async (endpoint) => {
    const userConfirmed = await confirm({
      title: "Confirmación requerida",
      body: "¿Estás seguro de que deseas desactivar este registro? Esta acción no se puede deshacer.",
      cancelButton: "Cancelar",
      actionButton: "Desactivar",
      icon: <LuAlertOctagon className="text-red-500 h-60 w-60 mx-auto mb-4" />,
    });
    if (!userConfirmed) {
      throw new Error("Operación cancelada por el usuario");
    }
    return handleRequest("get", endpoint);
  };

  const uploadFile = async (endpoint, file) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  return {
    get,
    post,
    put,
    eliminar,
    uploadFile,
    desactivar,
    loading,
    error
  };
};

export default useCRUD;