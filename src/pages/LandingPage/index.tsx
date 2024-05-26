import BarraMenu from '../../component/BarraMenu';

const LandingPage = () => {

    return(
        <>
            <div className=' vh-100 ms-5 me-5 border rounded-3 shadow'>
                <BarraMenu /> 
                <div  className='h-75 d-flex justify-content-evenly align-items-center bg-body-tertiary'>
                    {/* <GenericSelect 
                        Url='SedePos' 
                        Value={opc.value} 
                        className='w-25 form-select bg-warning'
                        onSelect={onSelect}
                    />
                    <div className='w-25 form-select bg-primary'>
                        <label htmlFor="">{opc.value}</label>
                    </div>
                    <div className='w-25 form-select bg-danger'>
                        <label htmlFor="">{opc.text}</label>
                    </div> */}                    
                </div>
                <div className='d-flex align-items-center justify-content-center ' style={{backgroundColor: "#2A3482"}}>
                    <span className=' h3 text-white'>@Corys90</span>
                </div>                        
            </div>
        </>
    )
};

export default LandingPage;