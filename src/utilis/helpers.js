export function formatDate (timestamp) {
    const d = new Date(timestamp)
    const time = d.toLocaleTimeString('en-US')
    return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
  }

function generateUID () {
return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function formatQuestion ({ optionOneText, optionTwoText, author }) {
    return {
      id: generateUID(),
      timestamp: Date.now(),
      author,
      optionOne: {
        votes: [],
        text: optionOneText,
      },
      optionTwo: {
        votes: [],
        text: optionTwoText,
      }
    }
  }


  export const colors = {
    green: {
      name: 'green',
      hex: '#21ba45'
    },
    blue: {
      name: 'blue',
      hex: '#2185d0'
    },
    grey: {
      name: null,
      hex: '#d4d4d5'
    }
  };
  
  export const styles = {
    primary: {
      color: 'green',
      bgColor: 'honeydew'
    },
    secondary: {
      color: 'grey',
      bgColor: '#f4f4f4'
    }
  };
  