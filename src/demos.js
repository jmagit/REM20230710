import React, { Component, useEffect, useState } from 'react'

export function Demos(props) {
    const [cont, setCont] = useState(1)
    const [visible, setVisible] = useState(true)
    const cambia = ev => {
        if (ev.data <= 10) {
            setCont(ev.data)
        } else {
            ev.cancel = true
        }
    }
    let nombre = "Don Jose";
    return (
        <>
            <p>
                <output style={{ color: 'blue' }}>{cont}</output>

            </p>
            <Contador init={1} onCambia={cambia} />
            <ContadorConClase init={10} />
            <Card titulo="Ejemplo componente" cartelito='algo' onLeer={() => console.log('leer mas')}>
                <Saluda nombre="Don Pepito" />
                <Saluda nombre={nombre} />
                <Despide nombre="Don Pepito" />
                <Despide nombre={nombre} />
            </Card>
            <button type='button' onClick={() => setVisible(!visible)} >{visible ? 'Ocultar' : 'Ver'}</button>
            {/* <Coordenadas /> */}
            {visible && <Reloj velocidad={cont} />}
        </>
    )
}

export function Reloj(props) {
    const [hora, setHora] = useState((new Date()).toLocaleTimeString())
    useEffect(() => {
        console.log(`pongo interval ${props.velocidad}`)
        let timerId = setInterval(() => {
            let msg = (new Date()).toLocaleTimeString()
            setHora(msg)
            console.log(msg)
        }, props.velocidad * 500)
        return () => {
            clearInterval(timerId)
            console.log('quito interval')
        }
    }, [props.velocidad])
    return <p>{hora}</p>
}
export class RelojConClase extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hora: new Date()
        }
        this.intervalo = null;
    }

    render() {
        return (
            <div>{this.state.hora.toLocaleTimeString()}</div>
        )
    }

    componentDidMount() {
        this.intervalo = setInterval(() => {
            this.setState({hora: new Date()})
        }, 1000)
    }

    // componentDidUpdate() {
    //     clearInterval(this.intervalo)
    //     this.intervalo = setInterval(() => {
    //         this.setState({hora: new Date()})
    //     }, 1000)
    // }

    componentWillUnmount() {
        clearInterval(this.intervalo)
    }
}

export function Coordenadas(props) {
    const [coordenadas, setCoordenadas] = useState({ latitud: null, longitud: null });
    useEffect(() => {
        console.log('Capturo geolocation')
        let watchId = window.navigator.geolocation.watchPosition(pos => {
            setCoordenadas({ latitud: pos.coords.latitude, longitud: pos.coords.longitude })
            console.log('Nuevas coordenadas')
        });
        return () => {
            console.log('libero geolocation')
            window.navigator.geolocation.clearWatch(watchId);
        }
    }, []);
    console.log('pinto componente')
    return coordenadas.latitud == null ? (<div>Cargando</div>) : (
        <div>
            <h1>Coordenadas</h1>
            <h2>Latitud: {coordenadas.latitud}</h2>
            <h2>Longitud: {coordenadas.longitud}</h2>
        </div>
    );
}

function Saluda(props) {
    let nombre = props.nombre.toUpperCase();
    return <h1>{`Hola ${nombre}`}</h1>
}

function Despide({ nombre }) {
    nombre = nombre.toUpperCase();
    return <h1>Hola {nombre}</h1>
}

function Card({ titulo, children, onLeer, cartelito = 'Leer mas' }) {
    return (
        <div className="card" style={{ width: "28rem" }}>
            <div className="card-body">
                <h5 className="card-title">{titulo}</h5>
                <div className="card-text">{children}</div>
                <div className="card-text"><button type='button' onClick={() => onLeer && onLeer()} >{cartelito}</button></div>
            </div>
        </div>
    )
}

function Pantalla({ valor, estilo, visible }) {
    return <output style={estilo} hidden={visible}>{valor}</output>
}
function Contador({ init = 10, delta = 1, onCambia = () => { } }) {
    let [contador, setContador] = useState(+init)
    let [otro, setOtro] = useState(+init)

    const cambia = variación => {
        const ev = { data: contador + variación, cancel: false }
        if (onCambia) onCambia(ev)
        if (ev.cancel) return
        // setContador(contador + variación)
        setContador(c => c + variación)
        // setContador(c => c + variación)
        // setOtro(c => c + variación)
        // contador++
        // setContador(contador + variación)
        console.log(contador)
    }
    const sube = () => cambia(+delta)
    const baja = () => cambia(-delta)
    console.log('pinto')
    return (
        <div>
            <Pantalla valor={contador} />
            <Pantalla valor={otro} />
            <button type='button' onClick={baja}>-</button>
            <button type='button' onClick={sube}>+</button>
            <button type='button' onClick={() => setContador(0)}>init</button>
        </div>
    )
}


export default class ContadorConClase extends Component {
    constructor(props) {
        super(props)
        this.state = { contador: +this.props.init ?? 10 }
        this.delta = +(this.props.delta ?? 1)
        this.sube = () => this.cambia(this.delta)
        this.baja = this.baja.bind(this)
    }
    cambia(variación, e) {
        // this.setState({ contador: this.state.contador + variación })
        this.setState(prev => ({ contador: prev.contador + variación }))
        console.log(this.state.contador)
        // console.log(e)
    }
    baja(e) {
        this.cambia(-this.delta, e)
        e.stopPropagation()
    }
    render() {
        return (
            <div onClick={e => console.log('clic en', e.target)}>
                <Pantalla valor={this.state.contador} />
                <button type='button' onClick={this.baja} >-</button>
                <button type='button' onClick={this.cambia.bind(this, -this.delta)} >--</button>
                <button type='button' onClick={this.sube}>+</button>
                <button type='button' onClick={() => this.setState({ contador: 0 })}>init</button>
                <button type='button' onClick={() => this.delta++}>delta</button>
                <Pantalla valor={this.delta} />
            </div>
        )
    }
}

