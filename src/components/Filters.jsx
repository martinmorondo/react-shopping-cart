import { useId } from "react";
import { useFilters } from '../hooks/useFilters';
import './Filters.css';

export function Filters () {
    const { filters, setFilters } = useFilters()
  
    const minPriceFilterId = useId()
    const categoryFilterId = useId()
  
    const handleChangeMinPrice = (event) => {
      setFilters(prevState => ({
        ...prevState,
        minPrice: event.target.value
      }))
    }
  
    const handleChangeCategory = (event) => {
      setFilters(prevState => ({
        ...prevState,
        category: event.target.value
      }))
    }
  
    return (
        <section className='filters'>

      <div>
        <label htmlFor={minPriceFilterId}>Precio a partir de:</label>
        <input
          type='range'
          id={minPriceFilterId}
          min='0'
          max='1000'
          onChange={handleChangeMinPrice}
          value={filters.minPrice}
        />
        <span>${filters.minPrice}</span>
      </div>

      <div>
        <label htmlFor={categoryFilterId}>Categoría</label>
        <select id={categoryFilterId} onChange={handleChangeCategory}>
          <option value='all'>Todas</option>
          <option value='laptops'>Portátiles</option>
          <option value='smartphones'>Celulares</option>
          <option value='fragrances'>Fragancias</option>
          <option value='skincare'>Cuidado de piel</option>
          <option value='groceries'>Comestibles</option>
          <option value='home-decoration'>Decoración</option>
        </select>
      </div>

    </section>
    )
}