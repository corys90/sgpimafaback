const Alert = (props: any) => {
    return (
           (props.show) ? 
                        <div className={`border border-danger rounded`} style={{backgroundColor: `${props.alert}`, color: "red"}}>
                            <ul className={`text-${props.alert}`}>
                                {
                                    props.msg.map((msg: string, idx: number)=><li key={idx}>{msg}</li>)
                                }
                            </ul>
                        </div>
                        : null
     
    );
};

export default Alert;