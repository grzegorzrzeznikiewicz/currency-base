import ResultBox from './ResultBox';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


describe('Component ResultBox', () => {
    it('should render without crashing', () => {
        render(<ResultBox from="PLN" to="USD" amount={100}/>);
    });
});

const testCases = [
    {amount: 100, from: 'PLN', to: 'USD', expected: 'PLN 100.00 = $28.57'},
    {amount: 20, from: 'USD', to: 'PLN', expected: '$20.00 = PLN 70.00'},
    {amount: 200, from: 'PLN', to: 'USD', expected: 'PLN 200.00 = $57.14'},
    {amount: 345, from: 'USD', to: 'PLN', expected: '$345.00 = PLN 1,207.50'},
];

for (const testObj of testCases) {
    describe('Component ResultBox', () => {
        it(`should render proper info about conversion (amount: ${testObj.amount}, from: ${testObj.from}, to: ${testObj.to})`, () => {
            // render component
            render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount}/>);


            // find fields elems
            const resultField = screen.getByTestId('result');
            expect(resultField).toHaveTextContent(testObj.expected);

            // unmount component
            cleanup();
        });
    });
}

const wrongValueCases = [
    {amount: -100, from: 'PLN', to: 'USD'},
    {amount: -1, from: 'USD', to: 'PLN'},
    {amount: -0.01, from: 'PLN', to: 'USD'},
    {amount: -9999, from: 'USD', to: 'PLN'},
];

for (const testObj of wrongValueCases) {
    describe('Component ResultBox', () => {
        it(`should render wrong value info when amount is lower than zero (amount: ${testObj.amount}, from: ${testObj.from}, to: ${testObj.to})`, () => {
            render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount}/>);

            expect(screen.getByText('Wrong value...')).toBeInTheDocument();

            cleanup();
        });
    });
}
