class APIFeatures {
  constructor(query, queryObj) {
    this.query = query;
    this.queryObj = queryObj;
  }

  filter() {
    let queryObj = { ...this.queryObj };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.map((ef) => delete queryObj[ef]);

    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|eq|ne)\b/g,
      (match) => `$${match}`
    );

    queryObj = JSON.parse(queryStr);

    this.query = this.query.find(queryObj);

    return this;
  }

  sort() {
    if (this.queryObj.sort) {
      let sortingStr = JSON.stringify(this.queryObj.sort);
      sortingStr = sortingStr.split(',').join(' ').replace(/"/g, '');

      this.query = this.query.sort(sortingStr);
    }

    return this;
  }

  limitFields() {
    if (this.queryObj.fields) {
      let fieldsStr = JSON.stringify(this.queryObj.fields);
      fieldsStr = fieldsStr.split(',').join(' ').replace(/"/g, '');

      this.query = this.query.select(fieldsStr);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const page = this.queryObj.page * 1 || 1;
    const limit = this.queryObj.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
