module.exports = (sequelize, DataTypes) => {
  const movie = sequelize.define('movie', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    releaseDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'release_date'
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    synopsis: {
      type: DataTypes.TEXT('long')
    },
    genre: {
      type: DataTypes.STRING,
      get: function () {
        return this.getDataValue('genre').split(',');
      },
      set: function (genres) {
        console.log(genres);
        this.setDataValue('genre', genres.join(','))
      }
    }
  }, {
    validate: {
      uniqueGenres() {
        console.log(this.genre);
        for (i in this.genre) {
          var genreName = this.genre[i].toLowerCase();
          var sameGenres = this.genre.filter((g) => {
            return g.toLowerCase() === genreName;
          });
          if (sameGenres.length > 1) {
            throw new Error("You cannot have duplicate genres");
          }
        }
      }
    }
  });

  return movie;
}
