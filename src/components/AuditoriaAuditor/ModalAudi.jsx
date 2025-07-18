import React, { useState } from 'react'; 

const ModalAuditoria = ({isOpen, onClose}) => {
    const [estado, setEstado] = useState('en_proceso'); // Estado inicial

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-black z-50">
            <div className="bg-white rounded-lg shadow-lg w-4/6 max-w-4xl p-6 relative">
                <button className="absolute top-2 right-2 text-black text-xl font-bold" onClick={onClose}>X</button>
                <h2 className="text-2xl font-bold mb-4">Verificación de Auditoría</h2>
                <div className='flex'>
                    <div className="flex-1 pr-4">
                        <div className='flex space-x-6'>
                            <div className="mb-4 w-1/2">
                                <label className="block mb-2 font-bold">Nombre:</label>
                                <input value="Carlos Zambrano Royola" type="text" id="nombre" className="mt-1 block w-full border border-gray-300 rounded-md p-2" placeholder="Ingrese su nombre" />
                            </div>
                            <div className="mb-4 w-1/2">
                                <label className="block mb-2 font-bold">Cargo:</label>
                                <input value="Coordinador" type="text" id="cargo" className="mt-1 block w-full border border-gray-300 rounded-md p-2" placeholder="Ingrese su cargo" />
                            </div>
                        </div>
                        <div className='flex'>
                            <div className="mb-4 w-full">
                                <label className="block mb-2 font-bold">Laboratorio:</label>
                                <input value="Instituto de Investigación Geofísica de la UNSA-IDIGUNSA" type="text" id="laboratorio" className="mt-1 block w-full border border-gray-300 rounded-md p-2" placeholder="Ingrese el laboratorio" />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 font-bold">Comentarios:</label>
                            <textarea value="Quisiera una auditoria para mi instituto" id="comentarios" className="mt-1 block w-full border border-gray-300 rounded-md p-2" placeholder="Ingrese sus comentarios"></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 font-bold">Horario:</label>
                            <input value="Tengo disponibilidad el dia 25 a las 11:30 am" type="text" id="horario" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalAuditoria;