import React, { useState, useMemo } from 'react';

import api from '../../services/api';

import './styles.css';

import camera from '../../assets/camera.svg';

export default function New({ history}) {
    const [ thumbnail, setThumbnail ] = useState(null);
    const [ company, setCompay ] = useState('');
    const [ techs, setTechs ] = useState('');
    const [ price, setPrice ] = useState('');

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [ thumbnail ]);

    async function handleSubmit(event) {
        event.preventDefault();

        const user_id = localStorage.getItem('user');
        const params = new FormData();
        params.append('thumbnail', thumbnail);
        params.append('company', company);
        params.append('techs', techs);
        params.append('price', price);

        await api.post('/spots', params, {
            headers: { user_id }
        });

        history.push('/dashboard');
    }

    return (
        <form onSubmit={handleSubmit}>
            <label 
                id="thumbnail" 
                style={{ backgroundImage: `url(${preview})` }}
                className={thumbnail ? 'has-thumbnail' : ''}    
            >
                <input type="file" onChange={e => setThumbnail(e.target.files[0])}/>
                <img src={camera} alt="Select img" />
            </label>

            <label htmlFor="company">EMPRESA *</label>
            <input 
                type="text"
                id="company"
                name="company"
                placeholder="Sua empresa incrível"
                value={company}
                onChange={e => setCompay(e.target.value)}
            />

            <label htmlFor="techs">
                TECNOLOGIAS * <span>(separadas por vírgula)</span>
            </label>
            <input 
                type="text"
                id="techs"
                name="techs"
                placeholder="Quais tecnologias usam?"
                value={techs}
                onChange={e => setTechs(e.target.value)}
            />    

            <label htmlFor="company">
                VALOR DA DIÁRIA * <span>(em branco para GRATUITO)</span>
            </label>
            <input 
                type="number"
                id="price"
                name="price"
                placeholder="Valor cobrado por dia"
                value={price}
                onChange={e => setPrice(e.target.value)}
            />                    

            <button className="btn">Cadastrar</button>
        </form>
    );
}