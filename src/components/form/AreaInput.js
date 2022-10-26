import styles from './AreaInput.module.css'

function AreaInput(
    {type, 
    text,
    name, 
    placeholder, 
    handleOnchange, 
    value,
    multiple
}){
    return(
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <input type={type} 
                    name={name} 
                    id={name} 
                    placeholder={placeholder}
                    onChange={handleOnchange}
                    value={value}
                    {...(multiple ? {multiple} : '')}
                    />

        </div>
    )

}

export default AreaInput