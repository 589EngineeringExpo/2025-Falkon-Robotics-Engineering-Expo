import '../App.css';
import AnimatedList from '../components/AnimatedList'

export default function Booths() {
            const items = ['Booth 1', 'Booth 2', 'Booth 3', 'Booth 4', 'Booth 5', 'Booth 6', 'Booth 7', 'Booth 8', 'Booth 9', 'Booth 10']; 

    return (
           <div className="app-container">
            <div className="row center-content">
                <span className="flex-item">Booths site!</span>
        <AnimatedList
    items={items}
    onItemSelect={(item, index) => console.log(item, index)}
    showGradients={true}
    enableArrowNavigation={true}
    displayScrollbar={true}
        />
            </div>
</div>
    );
}
