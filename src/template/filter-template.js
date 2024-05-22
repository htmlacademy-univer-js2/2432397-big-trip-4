import {FilterType} from '../const';

export function createFilterTemplate(currentFilterType) {
  return (
    `<form class="trip-filters" action="#" method="get">
      ${Object.values(FilterType).reduce((acc, filterType) => (`${acc}<div class="trip-filters__filter">
        <input id="filter-${filterType}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter"
          value="${filterType}" ${currentFilterType === filterType ? 'checked' : ''}>
        <label class="trip-filters__filter-label" for="filter-${filterType}">${filterType[0].toUpperCase() + filterType.slice(1)}</label>
      </div>`), '')}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}
