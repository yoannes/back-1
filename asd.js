const main = () => {
  setTimeout(() => {
    console.log("oi")
    main()
  }, 1000)
}

main()
