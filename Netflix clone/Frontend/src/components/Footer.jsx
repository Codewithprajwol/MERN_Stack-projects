
const Footer = () => {
  return (
    <footer className="md:px-8 bg-black text-white border-t border-gray-800">
        <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
            <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                Built by {" "}
                <a target="_blank" className="font-medium underline underline-offset-4" href="https://github.com/Codewithprajwol">Prajwol</a>
                . The source code is available on {" "}
                <a href="https://github.com/Codewithprajwol/MERN_Stack-projects" target="_blank" rel="noreferrer" className='font-medium underline underline-offset-4'>github link</a> 
            </p>
        </div>
    </footer>

  )
}

export default Footer