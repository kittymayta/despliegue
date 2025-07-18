import { use, useEffect, useState } from "react";
import { ButtonBlue, ButtonGray } from "@/components/custom/button";
import useCRUD from "@/hooks/useCrud";
import { toast } from "sonner";
import Image from 'next/image';

const getTipoUsuarioLabel = (codigoTipoUsuario) => {
    switch (codigoTipoUsuario) {
      case 1:
        return 'Administrador';
      case 2:
        return 'Coordinador';
      case 3:
        return 'Operador';
      case 4:
        return 'Lider Auditor';
      case 5:
        return 'Auditor';
      default:
        return 'Desconocido';
    }
  };

const MiCuenta = () => {
    const {post} = useCRUD();
    const [entidad, setEntidad] = useState(null);
    const [role, setRole] = useState("Desconocido");
    const [usuario, setUsuario] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editableUsuario, setEditableUsuario] = useState({});
    const [codigo, setCodigo] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const usuarioStorage = localStorage.getItem("usuario");
            if (usuarioStorage) {
                const usuarioParsed = JSON.parse(usuarioStorage);
                setUsuario(usuarioParsed);
                setEditableUsuario(usuarioParsed);
                setCodigo(usuarioParsed.codigoUsuario);
                if (usuarioParsed.tipoUsuario && usuarioParsed.tipoUsuario.codigoTipoUsuario !== undefined) {
                    setRole(getTipoUsuarioLabel(usuarioParsed.tipoUsuario.codigoTipoUsuario));
                }
                if (usuarioParsed.entidad && usuarioParsed.entidad !== null) {
                    setEntidad(usuarioParsed.entidad.nombreEntidad);
                }
            }
        }
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditableUsuario(usuario);
    };

    const handleSave = async () => {
        const data = {
            nombreUsuario: editableUsuario.nombreUsuario,
            apellidoPat: editableUsuario.apellidoPat,
            apellidoMat: editableUsuario.apellidoMat,
            dni: editableUsuario.dni,
            correoElectronico: editableUsuario.correoElectronico,
            telefono: editableUsuario.telefono,
            tipoUsuario: {
                codigoTipoUsuario: usuario.tipoUsuario.codigoTipoUsuario,
                nombreTipoUsuario: usuario.tipoUsuario.nombreTipoUsuario
            },
            entidad: (usuario.tipoUsuario.codigoTipoUsuario === 2 || usuario.tipoUsuario.codigoTipoUsuario === 3) ? {
                codigoEntidad: usuario.entidad.codigoEntidad,
            } : null,
            estadoUso: editableUsuario.estadoUso,
        }
        try {
            await post(`usuarios/update/${usuario.codigoUsuario}`, data);
            setUsuario(data);
            localStorage.setItem('usuario', JSON.stringify(data));
            setIsEditing(false);
            toast.success("Su usuario ha sido editado exitosamente");
        } catch (error) {
            console.error('Error updating user:', error);
            toast.error("Ocurrio un error al momento de actualizar su usuario");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditableUsuario((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="p-4 sm:p-6 space-y-6 text-black w-full">
            {/* Contenedor Principal */}
            <div className="border border-black rounded-3xl p-4 md:flex md:space-x-8 md:items-center md:justify-between">
                <div className="flex-1 space-y-2 md:space-y-0">
                    <h1 className="text-lg md:text-2xl font-semibold">Roles</h1>
                    <label className="block font-bold text-sm md:text-base">Tipo de Usuario</label>
                    <div className="border border-black rounded-lg p-2 w-full md:w-52">
                        <label className="text-sm md:text-base">{role}</label>
                    </div>
                    {entidad && (
                        <div>
                            <label className="block font-bold text-sm md:text-base">Laboratorio/Instituto</label>
                            <div className="border border-black rounded-lg p-2 w-full md:w-max">
                                <label className="text-sm md:text-base">{entidad}</label>
                            </div>
                        </div>
                    )}
                </div>
                {/* Imagen Responsiva */}
                <div className="mt-4 md:mt-0 md:ml-4 flex justify-center items-center">
                    <Image
                        src="/images/logoinvesti.png"
                        alt="Instituto de Investigación"
                        className="h-36 w-36 md:h-60 md:w-60 rounded-full"
                        width={500}
                        height={500}
                    />
                </div>
            </div>

            {/* Sección de Datos */}
            <div className="border border-black rounded-3xl p-4 space-y-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-lg md:text-2xl font-semibold">Datos</h1>
                    {!isEditing && (
                        <ButtonBlue className="py-1 px-3 rounded-lg text-sm md:text-base" onClick={handleEdit}>
                            Editar
                        </ButtonBlue>
                    )}
                </div>
                {/* Campos explícitos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                        <label className="block font-bold mb-1 text-sm md:text-base">Nombres</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="nombreUsuario"
                                value={editableUsuario.nombreUsuario || ""}
                                onChange={handleInputChange}
                                className="border border-black rounded-lg p-2 w-full text-sm md:text-base"
                            />
                        ) : (
                            <div className="p-2 border border-black rounded-lg text-sm md:text-base">
                                {usuario.nombreUsuario || ""}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block font-bold mb-1 text-sm md:text-base">Correo Electrónico</label>
                        <input
                            type="text"
                            name="correoElectronico"
                            value={editableUsuario.correoElectronico || ""}
                            className="border border-black rounded-lg p-2 w-full text-sm md:text-base"
                            readOnly
                        />
                    </div>

                    <div>
                        <label className="block font-bold mb-1 text-sm md:text-base">Apellido Paterno</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="apellidoPat"
                                value={editableUsuario.apellidoPat || ""}
                                onChange={handleInputChange}
                                className="border border-black rounded-lg p-2 w-full text-sm md:text-base"
                            />
                        ) : (
                            <div className="p-2 border border-black rounded-lg text-sm md:text-base">
                                {usuario.apellidoPat || ""}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block font-bold mb-1 text-sm md:text-base">Apellido Materno</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="apellidoMat"
                                value={editableUsuario.apellidoMat || ""}
                                onChange={handleInputChange}
                                className="border border-black rounded-lg p-2 w-full text-sm md:text-base"
                            />
                        ) : (
                            <div className="p-2 border border-black rounded-lg text-sm md:text-base">
                                {usuario.apellidoMat || ""}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block font-bold mb-1 text-sm md:text-base">DNI</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="dni"
                                value={editableUsuario.dni || ""}
                                onChange={handleInputChange}
                                className="border border-black rounded-lg p-2 w-full text-sm md:text-base"
                            />
                        ) : (
                            <div className="p-2 border border-black rounded-lg text-sm md:text-base">
                                {usuario.dni || ""}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block font-bold mb-1 text-sm md:text-base">Teléfono</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="telefono"
                                value={editableUsuario.telefono || ""}
                                onChange={handleInputChange}
                                className="border border-black rounded-lg p-2 w-full text-sm md:text-base"
                            />
                        ) : (
                            <div className="p-2 border border-black rounded-lg text-sm md:text-base">
                                {usuario.telefono || ""}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {isEditing && (
                <div className="flex justify-center mt-4 space-x-4 md:space-x-12">
                    <ButtonGray onClick={handleCancel} className="px-4 sm:px-8">
                        Cancelar
                    </ButtonGray>
                    <ButtonBlue className="px-4 sm:px-8" onClick={handleSave}>
                        Guardar
                    </ButtonBlue>
                </div>
            )}
        </div>
    );
};

export default MiCuenta;