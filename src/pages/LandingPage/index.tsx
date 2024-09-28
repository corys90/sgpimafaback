import BarraMenu from '../../component/BarraMenu';

const LandingPage = () => {

    return(
        <>
            <BarraMenu />         
            <div className='vh-100 border rounded-3 shadow w-100'>
                <div  className='h-75 bg-body-tertiary'>                
                </div>
                <div className='d-flex align-items-center justify-content-center ' style={{backgroundColor: "#2A3482"}}>
                    <span className=' h3 text-white'>@Corys90</span>
                </div>                        
            </div>
        </>
    )
};

export default LandingPage;