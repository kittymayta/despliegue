const ObtenerUsuario = () => {
    const usuarioStorage = localStorage.getItem("usuario");
    const usuarioParsed = JSON.parse(usuarioStorage);
    return usuarioParsed;
}
export default ObtenerUsuario;