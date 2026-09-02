import noresult from '../assets/no-connection.png'
import { MdSearchOff } from "react-icons/md";
const Noresult = ({ input }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column', gap: 20, maxWidth: 1200, padding: 20, overflow: 'hidden', margin: '0 auto' }} >
            <div >
                <MdSearchOff style={{ opacity: 0.8 }} size={60} />
            </div>
            <h2 style={{ opacity: 0.8, textWrap: 'wrap', textAlign: 'center' }} >No result found <strong style={{ textWrap: 'wrap', wordBreak: 'break-all' }}>'{input}'</strong> </h2>

        </div>
    )
}

export default Noresult