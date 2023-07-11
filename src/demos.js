import React, { Component, useState } from 'react'

export function Demos(props) {
    let nombre = "Don Jose";
    return (
        <>
            <Contador init={5} />
            <ContadorConClase init={10} />
            <Card titulo="Ejemplo componente">
                <Saluda nombre="Don Pepito" />
                <Saluda nombre={nombre} />
                <Despide nombre="Don Pepito" />
                <Despide nombre={nombre} />
            </Card>
        </>
    )
}

function Saluda(props) {
    let nombre = props.nombre.toUpperCase();
    return <h1>{`Hola ${nombre}`}</h1>
}

function Despide({ nombre }) {
    nombre = nombre.toUpperCase();
    return <h1>Hola {nombre}</h1>
}

function Card({ titulo, children }) {
    return (
        <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
                <h5 className="card-title">{titulo}</h5>
                <div className="card-text">{children}</div>
            </div>
        </div>
    )
}

function Pantalla({ valor }) {
    return <output>{valor}</output>
}
function Contador({ init = 10, delta = 1 }) {
    let [contador, setContador] = useState(+init)
    let [otro, setOtro] = useState(+init)

    const cambia = variación => {
        // setContador(contador + variación)
        setContador(c => c + variación)
        setContador(c => c + variación)
        setOtro(c => c + variación)
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
    cambia(variación) {
        this.setState({contador: this.state.contador + variación})
        console.log(this.state.contador)
    }
    baja () {
        this.cambia(-this.delta)
    }
    render() {
        return (
            <div>
            <Pantalla valor={this.state.contador} />
                <button type='button' onClick={this.baja} >-</button>
                <button type='button' onClick={this.sube}>+</button>
                <button type='button' onClick={() => this.setState({contador: 0})}>init</button>
            </div>
        )
    }
}
