import React, { useState, useEffect } from 'react'; 
import { ButtonBlue } from '@/components/custom/button';
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
import useCRUD from '@/hooks/useCrud';
import { toast } from "sonner"
import { useCallback } from "react";

const CrearAuditoria = ({fetchAuditorias}) => {
    const {get, post, put, eliminar}= useCRUD();
    const [lideres, setLideres] = useState([]);
    const [entities, setEntities] = useState([]);
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [selectedAuditor, setSelectedAuditor] = useState(null);
    const [normaIso, setNormaIso] = useState(1);
    const [selectedEntity, setSelectedEntity] = useState(null);
    

    const fetchLideres = useCallback(async () => {
        try {
            const response = await get("usuarios/tipoUsuario/4");
            setLideres(response);
        } catch (error) {
            console.log("Error al obtener los lideres", error);
        }
    }, [get]);

    const fetchEntidades = useCallback(async () => {
        try {
            const response = await get("entidades");
            setEntities(response);
        } catch (error) {
            console.log("Error al obtener las entidades: ", error);
        }
    }, [get]);

    useEffect(() => {
        fetchLideres();
        fetchEntidades();
    }, [fetchLideres, fetchEntidades]);

    const handleOptionChange = (value) => {
        const entity = entities.find((entity) => entity.codigoEntidad === value);
        setSelectedEntity(entity);
    };
    const nuevaAudi = async () => {
        const data = {
            nombreAuditoria: `Auditoria ${selectedEntity?.nombreEntidad}`,
            normaIso: {
                codigoNormaIso: normaIso,
            },
            codigoEstadoAuditoria: 1,
            fechaInicio: fechaInicio,
            fechaFinal: fechaFin,
            codigoEntidad: selectedEntity.codigoEntidad,
            usuario: {
                codigoUsuario: selectedAuditor
            }
        }
        try {
            await post("auditorias/create", data)
            toast.success("Auditoria creada exitosamente");
            fetchAuditorias();
        } catch (error) {
            console.log("Error al crear la nueva auditoria:", error);
            toast.error("Hubo un error al momento de crear la auditoria");
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <ButtonBlue className="mt-8">Crear Auditoría</ButtonBlue>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg bg-white text-black w-full max-w-[90%]">
                <DialogHeader>
                    <DialogTitle>Crear Auditoria</DialogTitle>
                    <DialogDescription>
                        En este espacio usted puede crear una nueva auditoria para alguna entidad.
                    </DialogDescription>
                </DialogHeader>
                <p>Seleccione la entidad para la auditoria</p>
                <Select onValueChange={handleOptionChange}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccione una entidad" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Entidades</SelectLabel>
                            {entities.map((entity) => (
                                <SelectItem key={entity.codigoEntidad} value={entity.codigoEntidad}>
                                    {entity.nombreEntidad}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <p>Seleccione el auditor líder</p>
                <Select onValueChange={(value) => setSelectedAuditor(value)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccione un Auditor Lider" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Auditores Lideres</SelectLabel>
                            {lideres.map((lider) => (
                                <SelectItem key={lider.codigoUsuario} value={lider.codigoUsuario}>
                                    {lider.nombreUsuario} {lider.apellidoPat} {lider.apellidoMat}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <p>Seleccione la norma ISO</p>
                <Select onValueChange={(value) => setNormaIso(value)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccione una norma ISO" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Normas ISO</SelectLabel>
                            <SelectItem value={1}>ISO 9001</SelectItem>
                            <SelectItem value={2}>ISO 17025</SelectItem>
                            <SelectItem value={3}>ISO 21001</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <div className="flex flex-wrap sm:flex-nowrap space-y-4 sm:space-y-0 sm:space-x-4">
                    <div className="mb-4 w-full sm:w-1/2">
                        <label className="block mb-2">Fecha de Inicio:</label>
                        <input
                            type="date"
                            value={fechaInicio}
                            onChange={(e) => setFechaInicio(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 w-full"
                        />
                    </div>
                    <div className="mb-4 w-full sm:w-1/2">
                        <label className="block mb-2">Fecha de Fin:</label>
                        <input
                            type="date"
                            value={fechaFin}
                            onChange={(e) => setFechaFin(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 w-full"
                        />
                    </div>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <ButtonBlue className="px-6" onClick={nuevaAudi}>
                            Crear
                        </ButtonBlue>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CrearAuditoria;