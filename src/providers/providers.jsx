'use client'
import { WeatherProvider } from '../context/WeatherContext'


export default function Providers({ children }) {
    return <WeatherProvider>{children}</WeatherProvider>
}