import React, { useState, useEffect } from 'react'; 
import { ButtonBlue } from '@/components/custom/button';
import useCRUD from '@/hooks/useCrud';
import Image from 'next/image';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
  } from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { toast } from "sonner"
import { useCallback } from "react";

const AsignarAuditor = ({ solicitud, fetchSolicitudes }) => {
    const {get, post, put, eliminar} = useCRUD();
    const [lideres, setLideres] = useState([]);
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [selectedAuditor, setSelectedAuditor] = useState(null);
    const [normaIso, setNormaIso] = useState(1);
    const codigoEntidad = solicitud?.usuario?.entidad?.codigoEntidad;
    const nombre = solicitud && solicitud.usuario
        ? `Auditoria ${solicitud.usuario.entidad.nombreEntidad}`
        : "Nombre no Generado";
    

        const fetchLideres = useCallback(async () => {
            try {
                const response = await get("usuarios/tipoUsuario/4");
                setLideres(response);
            } catch (error) {
                console.log("Error al obtener los Auditores Lideres", error);
            }
        }, [get]);
        
        useEffect(() => {
            fetchLideres();
        }, [fetchLideres]);

    const nuevaAudi = async() =>{
        const data = {
            nombreAuditoria: nombre,
            codigoNormaIso: normaIso,
            codigoEstadoAuditoria: 1,
            fechaInicio: fechaInicio,
            fechaFinal: fechaFin,
            codigoEntidad: codigoEntidad,
            usuario: {
                codigoUsuario: selectedAuditor
            }
        }
        try {
            await post("auditorias/create", data)
            console.log("Auditoria creada correctamente");
            procesarSolicitud();
            toast.success("Auditoria creada exitosamente.");
            fetchSolicitudes();
        } catch (error) {
            console.log("Error al crear la auditoria", error)
            toast.error("Error al crear la auditoria a partir de la solicitud.")
        }
    }
    const procesarSolicitud = async()=>{
        const data = {
            descripcion: solicitud.descripcion,
            fechaSolicitudAuditoria: solicitud.fechaSolicitudAuditoria,
            estadoAsignacion: true,
            usuario: {
                codigoUsuario: solicitud.usuario.codigoUsuario
            }
        }
        try {
            await post(`solicitudAuditorias/update/${solicitud.codigoSolicitudAuditoria}`, data)
            console.log("Solicitud procesada correctamente");
            toast.success("Estado de solicitud cambiado a Procesada");
        } catch (error) {
            console.log("Error al cambiar el estado de la solicitud a procesada", error)
            toast.error("Error al cambiar el estado de la solicitud a procesada");
        }
    }

    return (
        <Dialog>
            <DialogTrigger>
                <Image src="/images/icono-personacheck.png" alt="Asignar Auditor" className="w-6 h-6" />
            </DialogTrigger>
            <DialogContent className="bg-white text-black max-w-full md:max-w-lg mx-auto">
                <DialogHeader>
                    <DialogTitle>Crear auditoria</DialogTitle>
                    <DialogDescription>En este espacio usted puede crear una auditoria a partir de una solicitud.</DialogDescription>
                </DialogHeader>
                <p className="text-sm md:text-base">Seleccione el auditor líder correspondiente a la solicitud</p>
                <Select onValueChange={(value) => setSelectedAuditor(value)}>
                    <SelectTrigger className="w-full md:w-[470px]">
                        <SelectValue placeholder="Seleccione un Auditor Lider" />
                    </SelectTrigger>
                    <SelectContent className="w-full md:w-[470px]">
                        <SelectGroup>
                            <SelectLabel>Lideres Auditores</SelectLabel>
                            {lideres.map((lider) => (
                                <SelectItem key={lider.codigoUsuario} value={lider.codigoUsuario}>
                                    {lider.nombreUsuario} {lider.apellidoPat} {lider.apellidoMat}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <p className="text-sm md:text-base">Seleccione la norma ISO</p>
                <Select onValueChange={(value) => setNormaIso(value)}>
                    <SelectTrigger className="w-full md:w-[470px]">
                        <SelectValue placeholder="Seleccione una norma ISO" />
                    </SelectTrigger>
                    <SelectContent className="w-full md:w-[470px]">
                        <SelectGroup>
                            <SelectLabel>Normas ISO</SelectLabel>
                            <SelectItem value={1}>ISO 9001</SelectItem>
                            <SelectItem value={2}>ISO 17025</SelectItem>
                            <SelectItem value={3}>ISO 21001</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <div className="flex flex-wrap space-y-4 md:space-y-0 md:space-x-4">
                    <div className="mb-4 w-full md:w-1/2">
                        <label className="block mb-2 text-sm">Fecha de Inicio:</label>
                        <input
                            type="date"
                            value={fechaInicio}
                            onChange={(e) => setFechaInicio(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 w-full"
                        />
                    </div>
                    <div className="mb-4 w-full md:w-1/2">
                        <label className="block mb-2 text-sm">Fecha de Fin:</label>
                        <input
                            type="date"
                            value={fechaFin}
                            onChange={(e) => setFechaFin(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 w-full"
                        />
                    </div>
                </div>
                <DialogFooter className="flex justify-center md:justify-end">
                    <DialogClose>
                        <ButtonBlue className="px-6" onClick={nuevaAudi}>
                            Asignar
                        </ButtonBlue>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AsignarAuditor;